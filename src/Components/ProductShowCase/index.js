import {Loader} from 'react-loader-spinner'
import {Component} from 'react'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class ProductShowCase extends Component {
  state = {
    api: apiStatus.initial,
    categories: categoriesList[0].id,
    data: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {categories, api} = this.state
    this.setState({api: apiStatus.loading})
    const url = `https://apis.ccbp.in/ps/projects?category=${categories}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updateData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({data: updateData, api: apiStatus.success})
      console.log(api)
    } else {
      this.setState({api: apiStatus.fail})
    }
  }

  header = () => (
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
    </nav>
  )

  changeSector = event => {
    this.setState({categories: event.target.value}, this.getData)
  }

  selection = () => {
    const {categories} = this.state

    return (
      <select
        className="select-class"
        value={categories}
        onChange={this.changeSector}
      >
        {categoriesList.map(each => (
          <option value={each.id} key={each.id}>
            {each.displayText}
          </option>
        ))}
      </select>
    )
  }

  successView = () => {
    const {data} = this.state

    return (
      <ul>
        {data.map(each => (
          <li key={each.id}>
            <img src={each.imageUrl} alt={each.name} />
            <p>{each.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderInProgressView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="card">
      <img
        className="image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.loading:
        return this.renderInProgressView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.fail:
        return this.renderFailureView()
      default:
        return this.successView()
    }
  }

  render() {
    const {api} = this.state
    console.log(api)
    return (
      <div>
        {this.header()}
        <div>{this.selection()}</div>
        <div>{this.FinalRender()}</div>
      </div>
    )
  }
}

export default ProductShowCase
