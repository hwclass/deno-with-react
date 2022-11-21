import { React } from './deps.ts';
import { TList } from './types.ts';

const List = (list: TList) => {
  const [checked, setChecked] = React.useState(false)

  const uniqueHeaders = list.list
    .map(listItem => Object.keys(listItem))
    .reduce((acc, listItem) => (acc.length < listItem.length ? listItem : acc), [])

  const Headers = () => {
    return uniqueHeaders.map((listItem, idx) => (<>
      <th key={idx}>{listItem}</th>
    </>))
  }

  const headersLength = uniqueHeaders.length;

  const EmptyHeader = () => (<th></th>)

  const CheckboxCell = ({ id }) => {
    return (
      <td key={id}>
        <label>
          <input id={id}
          value={id}
          type="checkbox"
          onClick={(e) => {console.log('HEDE!');}}
          className="nes-checkbox" />
          <span>&nbsp;</span>
        </label>
      </td>
    )
  }

  const ItemCell = ({ id, value }) => (<td key={id}><span className="nes-text">{value}</span></td>)

  const ItemCells = ({ item }) => {
    return Object.values(item)
      .map((value, idx) => (<ItemCell id={idx} value={value} />))
  }

  const EmptyCell = () => (<td></td>)

  const EmptyCells = ({ item }) => (
    headersLength > Object.values(item).length
    && (new Array(headersLength - Object.values(item).length).fill(<EmptyCell />))
  )

  const Rows = () => {
    return list.list.map((listItem, idx) => (
      <tr key={idx}>
        <CheckboxCell id={idx} />
        <ItemCells item={listItem} />
        <EmptyCells item={listItem} />
      </tr>
    ))
  }

  return (
    <div className="nes-table-responsive">
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