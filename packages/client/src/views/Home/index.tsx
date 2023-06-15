import { Card, Col, Row } from "antd";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
          <Card className={styles.card} title="机器人状态" bordered={false}>
            机器人状态
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
          <Card className={styles.card} title="平台介绍" bordered={false}>
            机器人智能管理平台，同时也是每日说的升级版。把一切配置化繁为简，
            从代码配置到可视化配置，从必须手动启动到自动启动。让一切变的更简单，让一切配置都不见。
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
          <Card className={styles.card} title="系统消息" bordered={false}>
            系统消息
          </Card>
        </Col>
      </Row>
    </div>
  );
}
