import { React } from '../deps.ts'

const Wrapper = ({ children }: { children: React.ReactElement }): JSX.Element => (
  <section className="topic gentle-flex">
    <h2 id="installation">
      <a href="#installation">#</a>8-bit Table
    </h2>
    <p>This demo has been developed for experimentation purposes.</p>
    <p>Please read <a href="https://github.com/hwclass/deno-react-example" target="_blank" rel="noopener">README.md</a>.</p>
    {children}
  </section>
)

export default Wrapper;