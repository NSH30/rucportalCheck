<template>
  <v-dialog v-model="preview" fullscreen transition="dialog-top-transition">
    <!--  <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" @click="viewPreview()" dark v-bind="attrs" v-on="on">
        Open Dialog
      </v-btn>
    </template> -->
    <transition name="fade">
      <v-card class="PreviewRUC" transition="scale-transition">
        <v-row no-gutters>
          <v-col>
            <v-card-title class="text-h7 card-title">
              Preview Component
            </v-card-title></v-col
          >
        </v-row>
        <v-row no no-gutters>
          <v-col class="ma-2 shrink-col1" md="4" sm="5" shrink
            ><div>Title: {{ info.title }}</div>
            <div>Description: {{ info.description }}</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="ma-0 fixed" md="7" sm="6" style="width: 550px">
            <v-carousel height="300px" @change="currentData = images[$event].src">
              <vue-picture-swipe
                :options="{ shareEl: false }"
                @close="visibleOff()"
                v-if="visible"
                ref="autoClicked"
                :items="imgData"
              >
              </vue-picture-swipe>
              <v-carousel-item
                style="cursor: grabbing"
                v-for="(item, i) in images"
                :key="i"
                :src="item.src"
                @click="visibleOn()"
              >
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <header>
              <slot name="header">
                <p class="headline ma-2">Request Component</p>
              </slot>
            </header>
          </v-col>
        </v-row>

        <!-- <slot name="body"> -->

        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col class="mx-2">
              <v-text-field
                v-model="RUC.purpose"
                :rules="[(v) => !!v || 'Purpose is required']"
                label="Purpose for use of component"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mx-2">
              <v-text-field
                v-model="RUC.project"
                :rules="[(v) => !!v || 'Project is required']"
                label="Project where component is to be used"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <!-- </slot> -->

        <v-footer fixed bottom>
          <v-row>
            <v-col class="text-right">
              <slot name="footer">
                <v-btn color="primary" @click="requestRUC()">Request Component</v-btn>
                <v-btn class="mx-2" color="primary" @click="closeDialog()"
                  >Close</v-btn
                ></slot
              >
            </v-col>
          </v-row>
        </v-footer>
      </v-card>
    </transition>
  </v-dialog>
</template>

<script>
import images from "../assets/config/images.json";
export default {
  name: "PreviewRuc",

  components: {},

  data() {
    return {
      imgData: [],
      currentData: "",
      visible: false,
      images: images.items,
      RUC: {
        id: null,
        title: "",
        description: "",
        published: false,
      },

      Title: "",
      Description: "",
    };
  },
  props: {
    info: {
      type: Array,
      required: true,
    },
    previewDialog: {
      type: Boolean,
      default: false,
    },
    RUCId: {
      type: Text,
      default: "",
    },
  },
  computed: {
    preview: {
      get() {
        return this.previewDialog;
      },
      set(previewvisible) {
        this.$emit("input", previewvisible);
      },
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
    checkClick() {
      console.log("auto clicked occured");
    },
    visibleOff() {
      this.visible = false;
    },

    visibleOn() {
      var obj = {
        src: this.currentData,
        thumbnail: this.currentData,
      };
      console.log("the soruce add is :", this.currentData);
      this.imgData = [];
      this.imgData.push(obj);

      this.images.forEach((item) => {
        if (this.imgData.indexOf(item) === -1) {
          this.imgData.push(item);
        }
      });

      this.visible = true;
    },
    func1() {
      this.$refs.zoom.reset();
    },
    requestRUC() {
      console.log("****Request sent");
    },
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

.shrink-col1 {
  flex: 3 1 0% !important;
}
.fixed {
  flex: 1 1 0% !important;
}
</style>
