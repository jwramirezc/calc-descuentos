class DiscountCalculator {
  constructor() {
    this.modal = null;
    this.elements = {
      precio: document.getElementById('precio'),
      descuento: document.getElementById('porcentaje_de_descuento'),
      priceTotal: document.getElementById('price_total'),
      discountAmount: document.getElementById('discount'),
      totalAfterDiscount: document.getElementById('total_after_discount'),
      modalElement: document.getElementById('modalResultado'),
      calcularBtn: document.getElementById('calcular-btn'),
      cerrarBtn: document.getElementById('cerrar-btn'),
      btnClose: document.getElementById('btn-close'),
    };
    this.init();
  }

  init() {
    try {
      this.modal = new bootstrap.Modal(this.elements.modalElement, {
        focus: true,
      });

      this.calcular_Descuento = this.calcular_Descuento.bind(this);
      this.setupEventListeners();
    } catch (error) {
      console.error('Error al inicializar:', error);
    }
  }

  setupEventListeners() {
    if (this.elements.cerrarBtn) {
      this.elements.cerrarBtn.addEventListener('click', e => {
        e.preventDefault();
        this.elements.calcularBtn.focus();
        this.modal.hide();
      });
    }

    // Manejador para el nuevo botón (btn-close)
    if (this.elements.btnClose) {
      this.elements.btnClose.addEventListener('click', e => {
        e.preventDefault();
        this.elements.calcularBtn.focus();
        this.modal.hide();
      });
    }

    this.elements.modalElement.addEventListener('hidden.bs.modal', () => {
      this.elements.calcularBtn.focus();
    });
  }

  // Método para validar inputs
  validarInputs(precio, descuento) {
    return !isNaN(parseFloat(precio)) && !isNaN(parseFloat(descuento));
  }

  // Método para calcular el descuento
  calcularMontos(precio, porcentaje) {
    const precioTotal = parseFloat(precio);
    const descuento = (precioTotal * porcentaje) / 100;
    const totalDescontado = precioTotal - descuento;

    return {
      precioTotal,
      descuento,
      totalDescontado,
    };
  }

  // Método para actualizar la UI
  actualizarUI(montos) {
    this.elements.priceTotal.textContent = `$${montos.precioTotal.toFixed(2)}`;
    this.elements.discountAmount.textContent = `$${montos.descuento.toFixed(
      2
    )}`;
    this.elements.totalAfterDiscount.textContent = `$${montos.totalDescontado.toFixed(
      2
    )}`;
  }

  // Método principal de cálculo
  calcular_Descuento() {
    const precio = this.elements.precio.value;
    const descuento = this.elements.descuento.value;

    if (!this.validarInputs(precio, descuento)) {
      alert('Por favor ingrese solo números para el precio y el descuento.');
      return;
    }

    const montos = this.calcularMontos(precio, descuento);
    this.actualizarUI(montos);
    this.abrirModal();
  }

  // Métodos para manejar el modal
  abrirModal() {
    if (this.modal) {
      this.modal.show();
    }
  }

  cerrarModal() {
    if (this.modal) {
      this.elements.calcularBtn.focus();
      this.modal.hide();
    }
  }
}

// Crear instancia cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
  const calculator = new DiscountCalculator();

  const calcularBtn = document.getElementById('calcular-btn');
  const cerrarBtn = document.getElementById('cerrar-btn');

  if (calcularBtn) {
    calcularBtn.addEventListener('click', () =>
      calculator.calcular_Descuento()
    );
  }

  if (cerrarBtn) {
    cerrarBtn.addEventListener('click', () => calculator.cerrarModal());
  }

  // Inicializar
  document.addEventListener('DOMContentLoaded', () => {
    const calculator = new DiscountCalculator();
    const calcularBtn = document.getElementById('calcular-btn');

    if (calcularBtn) {
      calcularBtn.addEventListener('click', () =>
        calculator.calcular_Descuento()
      );
    }
  });
});
