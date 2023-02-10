<template>
  <!-- <v-dialog v-model="dialog" fullscreen transition="dialog-top-transition"> -->
  <!--  <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template> -->
  <transition name="fade">
    <v-card v-model="dialog" class="PreviewRUC" transition="scale-transition">
      <div class="Preview-component">
        <v-card>
          <div class="preview-data">
            <v-card-title class="text-h7 card-title"> Preview Component </v-card-title>

            <v-card-title class="textField" outlined
              ><span>Title: {{ info.title }}</span></v-card-title
            >
            <br />
            <v-card-subtitle class="textField" outlined
              ><span>Description: {{ info.description }}</span></v-card-subtitle
            >
          </div>

          <div class="container-carousel">
            <v-carousel>
              <v-carousel-item class="Carousel-img" v-for="(image, i) in images" :key="i">
                <v-img :src="image.src" alt="Image Not Found" />
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-card>
      </div>
      <v-divider></v-divider>

      <v-card class="request-component">
        <header class="modal-header">
          <slot name="header">
            <p class="headline">Request Component</p>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <div class="submit-form mt-3 mx-auto">
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="RUC.purpose"
                  :rules="[(v) => !!v || 'Purpose is required']"
                  label="Purpose for use of component"
                  outlined
                  required
                ></v-text-field>

                <v-text-field
                  v-model="RUC.project"
                  :rules="[(v) => !!v || 'Project is required']"
                  label="Project where component is to be used"
                  outlined
                  required
                ></v-text-field>
              </v-form>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <v-btn color="primary" class="mt-3" @click="requestRUC"
              >Request Component</v-btn
            ></slot
          >
          <slot name="footer">
            <v-btn color="primary" class="mt-3" @click="closeDialog">Close</v-btn>
          </slot>
        </footer>
      </v-card>
    </v-card>
  </transition>
  <!-- </v-dialog> -->
  <!-- <v-card>
        <v-card-title class="text-h7 card-title">
          Component Preview
        </v-card-title>

        <v-card-title class="textField" outlined
          ><span>Title: {{ info.title }}</span></v-card-title
        >
        <br />
        <v-card-subtitle class="textField" outlined
          ><span>Description: {{ info.description }}</span></v-card-subtitle
        >

        <v-divider></v-divider>

        <v-carousel class="container-carousel">
          <v-carousel-item
            class="Carousel-img"
            v-for="(image, i) in images"
            :key="i"
          >
            <v-img :src="require + image.src" alt="Image Not Found" />
          </v-carousel-item>
        </v-carousel>

        <v-btn text class="btn-close" color="white" @click="closeDialog"
          >x</v-btn
        >
      </v-card> -->
</template>

<script>
export default {
  name: "PreviewRuc",

  data() {
    return {
      RUC: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      images: [],
      Title: "",
      Description: "",
    };
  },
  props: {
    info: {
      type: Array,
    },
    RUCId: {
      type: Text,
      default: "",
    },
  },
  /*  created() {
      console.log("**inside Images****");
      fetch("../assets/images.json")
        .then((response) => response.json())
        .then((data) => {
          this.images = data.images;
        });
    },
  */

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
.PreviewRUC {
  position: absolute;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Preview-component {
  height: 50%;
}

.preview-data {
  height: 400px;
}
.card-title {
  background-color: #085889;
  color: #ffff;
  height: 50px;
  justify-content: flex-start;
  padding: 0px 0px 10px 10px;
}
.container-carousel {
  position: absolute;
  bottom: 500px;
  left: 900px;
  width: 600px;
  height: 0px !important;
}
.request-component {
  padding: 15px;
}
.Carousel-img {
  margin: 10px;
  width: 380px;
  height: 400px;
}

.textField {
  height: 50px;
  width: 300px;
  padding: 5px 30px 20px 20px;
  margin: 0px;
}
.modal-footer {
  width: 250px;
  display: inline;
  padding-left: 75%;
}
.mt-3 {
  margin: 10px;
}
</style>
