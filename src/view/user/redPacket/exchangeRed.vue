<style scoped>
  .question-icon {
    background: url("../../../assets/betting/question.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px;
    height: 35px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .exchange-button {
    padding: 0 3.13%;
    margin-bottom: 4.6%;
  }

  .exchange-msg {
    padding: 3.13%;
    font-size: 14px;
    line-height: 2em;
    color: #999999;
  }
</style>
<style>
  .exchange-red .exchange-red-key {
    padding: 4.6% 0;
  }

  .exchange-red-key .mint-cell-wrapper {
    background: none;
  }
</style>
<template>
  <div class="box-init exchange-red">
    <v-head title="兑换红包">
      <span slot="right" class="question-icon" @click="goHelp"></span>
    </v-head>
    <div class="exchange-red-key">
      <mt-field placeholder="输入兑换码" v-model="cdKey" style="background: none;"/>
    </div>
    <div class="exchange-button">
      <mt-button type="danger" size="large" @click="exchangeCoupon">立即兑换</mt-button>
    </div>
    <div class="exchange-msg">
      兑换码一般通过活动发送,没有固定获取方式.如果您获得了兑换码,您可以用来兑换彩票红包,购买彩票时可用红包抵扣现金!
    </div>
  </div>
</template>

<script>
  import VHead from '../../../components/VHead.vue';
  import { Field, Button } from 'mint-ui';
  import Http from '../../../store/Http.js';
  import Toast from '../../../common/toast';
  import loading from '../../../common/loading';

  export default {
    name: 'exchangeRed',
    data () {
      return {cdKey: ''}
    },
    methods: {
      exchangeCoupon () {
        if (this.cdKey) {
          loading.show()
          Http.get('/Coupon/exchangeCoupon', {coupon_code: this.cdKey})
            .then(() => {
              loading.hide();
              Toast('兑换成功');
            })
            .catch(err => {
              switch (err.code) {
                case 1060202:
                  Toast('红包已失效');
                  break;
                case 1060201:
                  Toast('兑换码无效');
                  break;
                case 1060207:
                  Toast('超过兑换次数');
                  break;
                default:
              }
            })
        } else {
          Toast('兑换码不能为空');
        }
      },
      goHelp () {
        this.$router.push({
          name: 'WebPage',
          query: {
            title: '兑换红包帮助',
            url: 'https://phone-api.tigercai.com/index.php?s=/Content/help/coupon_exchange.html'
          }
        })
      }
    },
    components: {
      VHead,
      [Field.name]: Field,
      [Button.name]: Button
    }
  }
</script>
