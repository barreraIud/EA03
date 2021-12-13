<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-header">Products car</div>
      <div class="card-body">
        <template v-if="products.length === 0">
          <p>No existen productos</p>
        </template>
        <template v-if="products.length > 0">
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Ingrese su email para generar el pedido"
          />
          <table class="table table-hover table-borderless">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Inventory</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in products" :key="product.id">
                <ProductCar :product="product" :reloadCarFun="reloadCarFun" />
              </template>
            </tbody>
          </table>
          <button @click="buyNow" class="btn btn-warning btn-fill">
            Buy now
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { get, removeAll } from "../services/car";
import { ref, watchEffect } from "vue";
import ProductCar from "../components/ProductCar.vue";
import Swal from "sweetalert2";
import { createOrder } from "../services/order";

export default {
  components: {
    ProductCar,
  },
  setup() {
    const products = ref([]);
    const reloadCar = ref(false);
    const email = ref("");

    watchEffect(() => {
      reloadCar.value;

      products.value = get();
    });

    const reloadCarFun = () => {
      reloadCar.value = !reloadCar.value;
    };

    const buyNow = async () => {
      // TODO: logica para generar nueva orden
      /*  Swal.fire(
        'Created!',
        'Debes agregar tu lógica',
        'success'
      );*/

      if (email.value === "") {
        Swal.fire("Error", "Por favor escriba un email", "error");
        return;
      }

      Swal.fire({
        allowOutsideClick: false,
        text: "Generando tu pedido...",
      });

      Swal.showLoading();

      const order = {
        email: email.value,
        products: products.value,
      };

      const resp = await createOrder(order);
      Swal.close();

      if (!resp.ok) {
        Swal.fire(
          "Error",
          "Recuerde seleccionar las cantidades de productos deseados",
          "error"
        );
        return;
      }

      products.value = [];
      email.value = "";
      removeAll();
      reloadCarFun();
      Swal.fire("Genial!", "Hemos generado tu orden con éxito!", "info");
    };

    return {
      products,
      reloadCarFun,
      buyNow,
      email,
    };
  },
};
</script>

<style scoped>
.card-header {
  background: #de1822;
  color: white;
  font-size: 16px;
}
</style>