// Inicializar el modal cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
  modal = new bootstrap.Modal(document.getElementById('modalResultado'));
});

function calcular_Descuento() {
  const price = document.getElementById('precio').value;
  const discount = document.getElementById('descuento').value;

  if (isNaN(parseFloat(price)) || isNaN(parseFloat(discount))) {
    alert('Por favor ingrese solo números para el precio y el descuento.');
  } else {
    const precioTotal = parseFloat(price);
    const porcentaje = parseFloat(discount);

    const descuento = (precioTotal * porcentaje) / 100;
    const totalDescontado = precioTotal - descuento;

    console.log(descuento, totalDescontado);

    // alert(`El valor total con descuento es: $${totalDescontado.toFixed(2)}`);
    // Forma moderna (Bootstrap 5)
    document.getElementById('price_total').textContent =
      '$' + precioTotal.toFixed(2);
    document.getElementById('discount').textContent =
      '$' + descuento.toFixed(2);
    document.getElementById('total_after_discount').textContent =
      '$' + totalDescontado.toFixed(2);
    abrirModal();
  }
}

function abrirModal() {
  if (modal) {
    modal.show();
  }
}

function closeModal() {
  if (modal) {
    modal.hide();
  }
}
