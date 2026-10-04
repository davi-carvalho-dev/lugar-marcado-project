export default function ComoFunciona() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Escolha seu Restaurante</h3>
            <p className="text-text-muted">
              Navegue por nossa seleção de restaurantes e encontre o que mais combina com seus gostos.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Selecione o Horário</h3>
            <p className="text-text-muted">
              Escolha o horário que melhor se encaixa em sua agenda e garanta sua mesa.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Aproveite sua Refeição</h3>
            <p className="text-text-muted">
              Venha desfrutar de uma excelente refeição em um ambiente acolhedor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}