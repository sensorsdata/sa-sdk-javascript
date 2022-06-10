import Head from 'next/head';
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default function Layout(props) {
  return (
    <div>
      <Head>
        {/* SensorsData JS SDK */}
        <script dangerouslySetInnerHTML={{
              __html: `
                (function(para) {
                  if(typeof(window['sensorsDataAnalytic201505']) !== 'undefined') {
                    return false;
                  }
                  window['sensorsDataAnalytic201505'] = para.name;
                  window[para.name] = {
                    para: para
                  };
                })({
                  is_track_single_page: true, // !important
                  name: 'sensors',
                  server_url:'https://test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=lixiang',
                  heatmap_url: "https://static.sensorsdata.cn/sdk/latest/heatmap.min.js",
                  heatmap: {}
                });
            `
            }} />
        <script src="https://static.sensorsdata.cn/sdk/latest/sensorsdata.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `sensors.quick('autoTrack');` }} />
      </Head>
      <div style={layoutStyle}>
        <Header />
        {props.children}
      </div>
    </div>
  )
}
