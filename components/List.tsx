import { React } from '../deps.ts';
import { TListItem } from '../types.ts';

const List = ({ list }: { list: TListItem[] }) => {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [totalSelectedItems, setTotalSelectedItems] = React.useState(0)

  const generatedHeaders = list
    .map(listItem => Object.keys(listItem))
    .reduce((acc, listItem) => (acc.length < listItem.length ? listItem : acc), []) ?? null

  const Headers = () => {
    return (
      <>
        {generatedHeaders.map((listItem, idx) => <th key={idx}>{listItem}</th>)}
      </>
    )
  }

  const headersLength = generatedHeaders.length;

  const EmptyHeader = () => (<th></th>)

  const CheckboxCell = ({ id }: { id: number }) => {
    const onHandleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
      const value = evt.target.value;
      // if checked, add into the array
      if ((evt.target as HTMLInputElement).checked) {
        setSelectedRows([...selectedRows, value].sort());
        setTotalSelectedItems(totalSelectedItems + 1)
      } else {
        const filteredList = selectedRows.filter((item) => item !== value);
        setSelectedRows(filteredList.sort());
        setTotalSelectedItems(totalSelectedItems - 1)
      }
    }

    return (
      <td key={id}>
        <label>
          <input id={id}
            value={id}
            type="checkbox"
            onChange={onHandleCheckboxChange}
            checked={Boolean(selectedRows.find(rowId => id == rowId))}
            className="nes-checkbox"
          />
          <span>&nbsp;</span>
        </label>
      </td>
    )
  }

  const ItemCell = ({ id, value }: { id: number, value: string }) => (
    <td key={id}>
      <span className="nes-text">
        {value}
      </span>
    </td>
  )

  const ItemCells = ({ item }: { item: TListItem }) => {
    return (
      <>
        {Object.values(item)
          .map((value, idx) => 
            (<ItemCell id={idx} value={value} />))}
      </>
    )
  }

  const EmptyCell = () => (<td></td>)

  const EmptyCells = ({ item }: { item: TListItem }) => {
    return (
      <>
        {headersLength > Object.values(item).length
          && (new Array(headersLength - Object.values(item).length)
            .fill(<EmptyCell />))}
      </>
    )
  }

  const Rows = () => {
    return (
      <>
        {list.map((listItem, idx) => (
          <tr key={idx}>
            <CheckboxCell id={idx} />
            <ItemCells item={listItem} />
            <EmptyCells item={listItem} />
          </tr>
        ))}
      </>
    )
  }

  return (
    <div className="nes-table-responsive">
      <div>Selected items: <span className="test-selectedItems">{selectedRows.join(', ')}</span></div>
      <div>Total selected items: {totalSelectedItems}</div>
      <table className="nes-table is-bordered is-centered">
        <thead>
          <tr>
            <EmptyHeader />
            <Headers />
          </tr>
        </thead>
        <tbody>
          <Rows />
        </tbody>
      </table>
    </div>
  )
}

export default List;