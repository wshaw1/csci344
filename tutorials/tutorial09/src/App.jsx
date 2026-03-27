import React, { useState }  from "react";
import Card from "./components/Card.jsx";
import AntCard from "./components/AntCard.jsx";
import { Image, Carousel, Drawer, Button } from 'antd';


const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function App() {

		const onChange = currentSlide => {
			console.log(currentSlide);
		};

		const [open, setOpen] = useState(false);
		const showDrawer = () => {
			setOpen(true);
		};
		const onClose = () => {
			setOpen(false);
		};
	
    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
								<Card
									name="Sample item"
									image_url="https://picsum.photos/id/237/400/300"
									description="A short description goes here."
								/>
								<Card
									name="second item"
									image_url="https://picsum.photos/id/236/400/300"
									description="lkjdsa;fjlkdsjfa;lk"
								/>
								<AntCard
									name="second item"
									image_url="https://picsum.photos/id/236/400/300"
									description="lkjdsa;fjlkdsjfa;lk"
								/>
								<Image
									width={200}
									alt="basic"
									src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
								/>
								<Carousel afterChange={onChange}>
									<div>
										<h3 style={contentStyle}>1</h3>
									</div>
									<div>
										<h3 style={contentStyle}>2</h3>
									</div>
									<div>
										<h3 style={contentStyle}>3</h3>
									</div>
									<div>
										<h3 style={contentStyle}>4</h3>
									</div>
								</Carousel>
								<>
									<Button type="primary" onClick={showDrawer}>
										Open
									</Button>
									<Drawer
										title="Basic Drawer"
										closable={{ 'aria-label': 'Close Button' }}
										onClose={onClose}
										open={open}
									>
										<p>Some contents...</p>
										<p>Some contents...</p>
										<p>Some contents...</p>
									</Drawer>
								</>
						</main>
        </>
    );
}
