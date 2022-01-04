<template>
  <div>
    <b-button 
      class="ps-btn"
      v-b-modal.modal-prevent-closing
    >
      Nueva Cotización
    </b-button>

    <pre>{{ cotItems }}</pre>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="cotItem.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        cotItem: {
          name: '',
          total: 0
        },
        cotItems: []
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.cotItem.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault() // Prevent modal from closing
        
        this.handleSubmit() // Trigger submit handler
      },
      handleSubmit() {
        if (!this.checkFormValidity()) { // Exit when the form isn't valid
          return
        }
        
        this.cotItems.push(this.cotItem) // Push the name to submitted names
        this.cotItems = JSON.parse(JSON.stringify(this.cotItems))
        this.$nextTick(() => { // Hide the modal manually
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>