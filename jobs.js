const { QuickDB } = require("quick.db");

const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
	jobs: [

		/* TIER 0 JOBS */
        /*   0 - 100   */
		[
			{
				name: "Janitor",
				baselevel: 0,
				description: "Cleaning up after others, but you take pride in your work.",
				salary: 100,
				emoji: "🧹",
				id: "janitor",
				enabled: true,
			},
			{
				name: "Professional Napper",
				baselevel: 0,
				description: "You get paid to sleep, but it's not as easy as it sounds.",
				salary: 80,
				emoji: "😴",
				id: "professional_napper",
				enabled: true,
			},
			{
				name: "Pet Rock Trainer",
				baselevel: 0,
				description: "Training rocks to be the best they can be, one nap at a time.",
				salary: 90,
				emoji: "🪨",
				id: "pet_rock_trainer",
				enabled: true,
			},
			{
				name: "Cloud Counter",
				baselevel: 0,
				description: "Counting clouds all day, every day. It's a tough job.",
				salary: 70,
				emoji: "☁️",
				id: "cloud_counter",
				enabled: true,
			},
			{
				name: "Professional Line Stand-In",
				baselevel: 0,
				description: "You stand in lines so others don't have to. It's a calling.",
				salary: 85,
				emoji: "🕴️",
				id: "professional_line_stand_in",
				enabled: true,
			},
		],

		/* TIER 1 JOBS */
        /*  100 - 150  */
		[
			{
				name: "Retail Sales Associate",
				baselevel: 1,
				description: "You're unhappy and overworked, but at least you get a paycheck.",
				salary: 120,
				emoji: "🛍️",
				id: "retail_sales_associate",
				enabled: true,
			},
			{
				name: "Fast Food Worker",
				baselevel: 1,
				description: "Hot fries and cold cash, that's your life.",
				salary: 110,
				emoji: "🍔",
				id: "fast_food_worker",
				enabled: true,
			},
			{
				name: "Office Clerk",
				baselevel: 1,
				description: "Another day, another spreadsheet.",
				salary: 145,
				emoji: "📄",
				id: "office_clerk",
				enabled: true,
			},
			{
				name: "Delivery Driver",
				baselevel: 1,
				description: "Traffic jams and lights, that's your grind.",
				salary: 130,
				emoji: "🚚",
				id: "delivery_driver",
				enabled: true,
			},
			{
				name: "Warehouse Worker",
				baselevel: 1,
				description: "Heavy lifting and low pay, but you make it work.",
				salary: 125,
				emoji: "📦",
				id: "warehouse_worker",
				enabled: true,
			},
			{
				name: "Customer Service Representative",
				baselevel: 1,
				description: "You handle complaints like a pro, but it's draining.",
				salary: 115,
				emoji: "📞",
				id: "customer_service_representative",
				enabled: true,
			},
		],

		/* TIER 2 JOBS */
        /*  150 - 200  */
		[
			{
				name: "Construction Laborer",
				baselevel: 2,
				description: "Hard hats and hard work, but the pay is decent.",
				salary: 150,
				emoji: "👷",
				id: "construction_laborer",
				enabled: true,
			},
		],

	]
};
