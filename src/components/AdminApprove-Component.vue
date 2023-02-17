<template>
  <div>
    <v-dialog persistent max-width="600" v-model="dialog">
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="#2980cb" dark
            >Approve/Reject Request
            <v-spacer></v-spacer>
            <v-icon @click="dialog.value = false">mdi-close</v-icon>
          </v-toolbar>
          <v-card-text class="pa-0">
            <div class="pa-2">
              <p>Purpose :</p>
              <p>Project :</p>
              <p>Comments *</p>
              <v-textarea
                dense
                v-model="readText"
                :rules="rules"
                outlined
                background-color="white"
                no-resize
                rows="3"
                filled
                name="input-7-4"
                label="Filled textarea"
                value=""
                @change="enableReject()"
              ></v-textarea>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn small color="#2980cb" dark @click="dialog.value = false"
              >Approve</v-btn
            >
            <v-btn color="error" small primary :disabled="readText.length <= 6"
              >Reject</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disable: true,
      readText: "",
      max: 6,
      panel: [0, 1],
      disabled: false,
      readonly: false,
    };
  },
  props: {
    approveDialog: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    rules() {
      const rules = [];

      const rule = (v) =>
        (v || "").length >= this.max ||
        `A minimum of ${this.max} characters is neccssary`;

      rules.push(rule);

      return rules;
    },
    dialog: {
      get() {
        return this.approveDialog;
      },
      set(approvevisible) {
        this.$emit("input", approvevisible);
      },
    },
  },

  methods: {
    enableReject() {
      if (this.readText.length >= 6) {
        this.disable = false;
      }
    },
  },
};
</script>

<style>
.v-data-table__wrapper > table > thead > tr > th {
  background-color: #085889;
  color: white !important;
}

.greeting {
  color: red;
  font-weight: bold;
}

.expMargin {
  padding: 0px;
}
.expMargin {
  padding: 0px;
}
.v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
