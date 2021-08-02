import page404 from "../../Images/404.png";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <h1> Page not found !</h1>
            <img src={page404}/>
        </div>
    );
}

export default Page404;