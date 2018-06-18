<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn fixed dark fab bottom right color='pink' slot="activator"> <v-icon>add</v-icon></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Server</span>
        </v-card-title>
        <v-card-text>
         <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="server.name"
                label="Name"
                :rules="[v => !!v || 'Item is required']"
                required>
            </v-text-field>
            <v-text-field
                v-model="server.host"
                label="Host"
                :rules="[v => !!v || 'Item is required']"
                required>
            </v-text-field>
            <v-text-field
                v-model="server.user"
                label="User"
                :rules="[v => !!v || 'Item is required']"
                required>
            </v-text-field>
            <v-text-field
                v-model="server.password"
                label="password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[v => !!v || 'Item is required']"
                required>
            </v-text-field>
            <v-text-field
                v-model="server.path"
                label="Path"
                :rules="[v => !!v || 'Item is required']"
                required>
            </v-text-field>
            <v-btn @click="handleSubmit">submit</v-btn>
            <v-btn @click="close">close</v-btn>
        </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

module.exports = {
  data() {
    return {
      dialog: false,
      e1: true,
      valid: true,
      server: {
        name: "",
        host: "",
        path: "",
        user: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$root.$emit('serverAdd', {"name": this.server.name, "host": this.server.host, "path": this.server.path, "user": this.server.user, "password": this.server.password});
        this.close();
        this.valid = true;
      }
    },
    close() {
      this.clear();
      this.dialog = false;
    },
    clear() {
      this.$refs.form.reset();
    },
  }
};
</script>