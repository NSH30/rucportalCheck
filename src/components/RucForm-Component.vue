<template>
  <v-dialog persistent class="requestUserDataCss" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed dark small color="#085889" v-bind="attrs" v-on="on"
        >Add Component</v-btn
      >
    </template>
    <template v-slot:default="dialogBox">
      <v-card outlined class="pa-0" elevation="5">
        <v-card-title class="colour" outlined elevation="2">
          Add Component details
        </v-card-title>
        <v-form v-model="valid" class="bg">
          <v-container style="overflow: auto; max-height: 500px" class="text-right">
            <v-row v-for="field in fields" :key="field.label" no-gutters>
              <v-col cols="12" v-if="field.expression === 'textarea'">
                <v-textarea
                  v-model="fieldsData[field.value]"
                  :label="field.label"
                  outlined
                  :rules="[
                    () =>
                      !field.isRequired ||
                      !!fieldsData[field.value] ||
                      'This field is required',
                  ]"
                  >>
                  <template #label v-if="field.isRequired">
                    <div>
                      {{ field.label }}
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-textarea>
              </v-col>
              <v-col cols="12" v-if="field.expression === 'textfield'">
                <v-text-field
                  dense
                  outlined
                  sm="6"
                  :label="field.label"
                  v-model="fieldsData[field.value]"
                  :rules="[
                    () =>
                      !field.isRequired ||
                      !!fieldsData[field.value] ||
                      'This field is required',
                  ]"
                >
                  <template #label v-if="field.isRequired">
                    <div>
                      {{ field.label }}
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" v-if="field.expression === 'imageInput'">
                <v-file-input
                  accept="image/png, image/jpeg"
                  dense
                  outlined
                  multiple
                  v-model="fieldsData[field.value]"
                  prepend-icon="mdi-camera"
                  :label="field.label"
                ></v-file-input>
              </v-col>
              <v-col cols="12" v-if="field.expression === 'fileInput'">
                <v-file-input
                  accept=".zip"
                  dense
                  outlined
                  v-model="fieldsData[field.value]"
                  :label="field.label"
                  :rules="[
                    () =>
                      !field.isRequired ||
                      !!fieldsData[field.value] ||
                      'This field is required',
                  ]"
                >
                  <template #label v-if="field.isRequired">
                    <div>
                      {{ field.label }}
                      <span class="red--text">*</span>
                    </div>
                  </template>
                  ></v-file-input
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <div fixed class="text-right pa-1">
          <v-btn
            depressed
            class="ma-0"
            small
            color="primary"
            @click="add"
            :disabled="!valid"
          >
            Add</v-btn
          >
          <v-btn
            class="ma-3 colorBtn"
            depressed
            small
            color="rgb(241, 241, 241)"
            @click="dialogBox.value = false"
            >cancel</v-btn
          >
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
      dialogBox: true,
      name: "",
      fieldsData: null,
    };
  },
  mounted() {
    this.fieldsData = this.formData;
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    formData: null,
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    add() {
      this.$emit("addform");
    },
  },
};
</script>
<style>
.bg {
  background: white;
}
.requestUserDataCss {
  overflow-y: hidden !important;
}
.v-dialog {
  overflow-y: hidden !important;
}
.colour {
  background: #2980cb;
  color: white;
  height: 55px;
}
.colorBtn {
  border-color: rgb(241, 241, 241);
}
</style>
