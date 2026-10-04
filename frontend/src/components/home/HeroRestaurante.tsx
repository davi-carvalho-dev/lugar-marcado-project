export default function HeroRestaurante() {
  return (
    
     <section className="relative isolate h-dvh">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/image/restaurant-hero.jpg"
          alt="Hero image"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"/>
      </div>

      {/* Content */}
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-2xl text-white">

          <span className="mb-5 block text-sm font-medium uppercase tracking-[0.2em]">
            Descubra o seu Lugar Marcado
          </span>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Encontre seu próximo lugar favorito.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Descubra restaurantes, mesas e experiências que combinam
            com você. Escolha o lugar, o horário e faça sua reserva.
          </p>

          <button
            className="
              mt-8
              rounded-full
              bg-white
              px-7 py-3.5
              text-sm font-semibold text-neutral-900
              transition-all duration-300
              hover:bg-transparent
              hover:text-white
              hover:ring-1 hover:ring-white
            "
          >
            Explorar restaurantes
          </button>

        </div>
      </div>

    </section>
  )
}