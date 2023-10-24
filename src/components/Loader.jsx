const Loader = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backdropFilter: "blur(2px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100
            }}
        >
            <h1 style={{ fontSize: "64px" }}>Processing...</h1>
        </div>
    );
};

export default Loader