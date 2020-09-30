import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.min.css'

Vue.use(Viewer, {
  defaultOptions: {
    button: false,
    toolbar: false,
    tooltip: false,
    zoomable: false,
    navbar: false,
    title: false,
    rotatable: false,
    scalable: false,
    movable: false
  }
})
