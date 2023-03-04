import { useEffect, useState } from "react"
import ProductItem from "../ProductItem"
import { v4 as uuidv4 } from "uuid"
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "./index.css"


const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading",
    initial: 'inital'
}
const Products = () => {
    const [products, setProducts] = useState([{}])
    const [productsAPIStaus, setProductsAPIStatus] = useState(apiStatusConstants.initial)
    console.log(products)

    const getProducts = async () => {
        setProductsAPIStatus(apiStatusConstants.load)
        // const url = "http://localhost:4000/products"
        const url = "https://ansronebe.onrender.com"
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(url, options)
            const result = await response.json()
            setProducts(result.productsList)
            setProductsAPIStatus(apiStatusConstants.success)
        } catch (error) {
            console.log("Something went wrong in products api call", error)
            setProductsAPIStatus(apiStatusConstants.fail)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const renderSuccessView = () => (
        <div className="productsParentCon d-flex justify-content-center">
            <div className="productsCon mt-3">
                <h1 className="h2 mb-3">Products</h1>
                <ul className="list-unstyled d-flex row" >
                    {
                        products.map(obj => <ProductItem key={uuidv4()} eachItem={obj} />)
                    }
                </ul>
            </div>
        </div>
    )


    const renderFailureView = () => (
        <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div>
                <div className="text-center">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                        alt="products failure"
                        className="sizeFailure"
                    />
                </div>
                <h1 className="text-center">Something Went Wrong.</h1>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
    )



    const renderUi = () => {
        switch (productsAPIStaus) {
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.fail:
                return renderFailureView()
            case apiStatusConstants.load:
                return renderLoadingView()
            default:
                return null
        }
    }

    return <>{renderUi()}</>
}

export default Products