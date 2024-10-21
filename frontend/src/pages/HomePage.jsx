function  HomePage(){
    return(
        <div>
            <h1>Welcome to my home page</h1>
            <p>
                {localStorage.getItem('token')};
            </p>
        </div>
    )
}
export default HomePage;