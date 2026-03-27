import React from "react";
import { Card } from "antd";

export default function AntCard({ name, image_url, description }) {
	return (
		<Card
			style={{ width: 200 }}
			title={name}
			cover={<img alt="example" src={image_url}/>}
		>
			{description}
		</Card>
	);
}
