<template>
  <div>
    <div v-for="(server, index) in servers" :key="server.id">
      <br>
      <v-card >
        <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">{{server.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="handleDelete(index)">
              <v-icon >delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class= "elavation-0">
            <v-layout row wrap>
              <v-flex xs8>
                <FileUpload/>
              </v-flex>
              <v-flex xs4>
                <p> User: {{server.user}} </p>
                <p> Host: {{server.host}} </p>
                <p> Path: {{server.path}} </p>
              </v-flex>
            </v-layout>
          </v-card-text>
      </v-card>
    </div>
  </div>
</template>



<script>

import FileUpload from './FileUpload/FileUpload'

export default {
    components: { "FileUpload": FileUpload },
     data() {
      return { servers: []
              }
      },
      created() {
          this.$root.$on('serverAdd', (server) => {this.servers.push(server)});
      },
      methods: {
        handleDelete(index) {
          this.servers.splice(index,1);
        }
      }
  }
</script>
        }
      }
  }
</script>

<style scoped>
.electrofile-dropzone i {
  font-size: 100px;
}
</style>
