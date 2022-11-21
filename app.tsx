import { React } from './deps.ts'
import { TList } from './types.ts'

import List from './List.tsx'

const App = ({ list }: { list: TList[] }) => (
  <List list={list}/>
);

export default App;