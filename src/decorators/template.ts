import {createDecorator} from 'vue-class-component';

export default createDecorator(options => {
  console.log(options);
  // options.computed
  return options;
});
