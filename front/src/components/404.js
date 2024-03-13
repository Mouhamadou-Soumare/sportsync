import img404 from "../assets/404.jpg"

export default function Error404() {
    return (
      <>
        
        <main className="relative isolate min-h-full h-screen	">
          <img
            src={img404}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <p className="text-8xl font-semibold leading-8 text-white ">404</p>
            <h1 className="mt-12 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page non trouvée</h1>
            <p className="mt-4 text-2xl text-bold text-white/70 sm:mt-6">Peut-être vous dribblez dans la mauvaise direction ? Revenez sur vos pas et retrouvez le chemin vers le terrain principal.</p>
            <div className="mt-10 flex justify-center">
              <a href="/" className="text-2xl font-semibold leading-7 text-white">
                <span aria-hidden="true">&larr;</span> Retour à l'accueil
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  