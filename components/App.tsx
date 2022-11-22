import { React } from '../deps.ts'
import { TListItem } from '../types.ts'

import Wrapper from './Wrapper.tsx'
import List from './List.tsx'

const App = ({ list }: { list: TListItem[] }): JSX.Element => (
  <Wrapper>
    <List list={list} />
  </Wrapper>
);

export default App;