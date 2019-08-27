<template>
  <div>
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">地图模式</span>
    </el-page-header>
    <el-divider></el-divider>
    <div class="box">
      <div id="boxMap"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mapPoints: []
    };
  },
  methods: {
    goBack() {
      this.$router.push("/statisticsmode");
    },
    _getMapData() {
      var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
        "<img style='float:right;margin:4px' id='imgDemo' src='../img/tianAnMen.jpg' width='139' height='104' title='天安门'/>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>哈哈哈哈哈</p>" +
        "</div>";
      let map = new BMap.Map("boxMap");

      map.centerAndZoom("齐齐哈尔", 11);
      // map.addOverlay(marker);
      // 函数 创建多个标注
      var mapPoints = this.mapPoints;

      var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "CODE", // 信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      };
      for (var i = 0; i < mapPoints.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(mapPoints[i].x, mapPoints[i].y)
        ); // 创建标注
        var content = mapPoints[i].code;
        map.addOverlay(marker); // 将标注添加到地图中
        addClickHandler(content, marker);
      }
      function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
    }
  },
  created() {
    axios.get("/api/getmapmark").then(response => {
      console.log(response.data);
      this.mapPoints = response.data;
      this._getMapData();
    });
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 800px;
}
#boxMap {
  width: 100%;
  min-height: 800px;
}
</style>