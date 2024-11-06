
const Home = () => {
    return (
        <div className="bg-primary text-white font-sans min-h-screen">
          <div className=" p-3 bg-secondary shadow-xl text-center flex justify-between" >
            <div>
            <h1 className="justify-center  text-3xl text-primary mb-4"><strong>DO IT</strong></h1>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition-colors duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-accent transition-colors duration-300"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Home;