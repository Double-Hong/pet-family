<template>
  <Head/>
  <ForgetCard1/>
</template>

<script>

import Head from "@/components/Login/Head.vue"
import ForgetCard1 from "@/components/Login/ForgetCard1.vue"

export default {
  components: {
    Head,
    ForgetCard1,
  },
  created() {
  },
  data() {
    return {}
  },
  methods: {
    remove() {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
    }

  },

}
</script>
