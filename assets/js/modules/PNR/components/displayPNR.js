Vue.component('displayPNR', {
    props:{
        header:Object,
        data:{
            type : [Array, Object]
        },
    },
  template: `
    <div>
        {{data}}
    </div>`,
})
