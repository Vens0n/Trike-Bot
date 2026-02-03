const { QuickDB } = require("quick.db");

const inventoryDB = new QuickDB({ filePath: "DB/inventory.sqlite" });
const moneyDB = new QuickDB({ filePath: "DB/money.sqlite" });

module.exports = {
	jobs: [

		/* TIER 0 JOBS */
        /*   0 - 100   */
		[
			{
				name: "Cloud Counter",
				baselevel: 0,
				description: "Counting clouds all day, every day. It's a tough job.",
				risk: 0.05,
				damage: {
					type: 1, // percentage money loss
					factor: 0.2, // 20%
					message: "Ouch! You should look at the clouds, not the sun."
				},
				salary: 70,
				emoji: "☁️",
				id: "cloud_counter",
				enabled: true,
			},
			{
				name: "Professional Napper",
				baselevel: 0,
				description: "You get paid to sleep, but it's not as easy as it sounds.",
				risk: 0.03,
				damage: {
					type: 1, // percentage money loss
					factor: 0.15, // 15%
					message: "Idiot! You slept wrong and now your neck hurts."
				},
				salary: 80,
				emoji: "😴",
				id: "professional_napper",
				enabled: true,
			},
			{
				name: "Professional Line Stand-In",
				baselevel: 0,
				description: "You stand in lines so others don't have to. It's a calling.",
				risk: 0.04,
				damage: {
					type: 1, // percentage money loss
					factor: 0.18, // 18%
					message: "Dang, someone bumped into you and you fell over!"
				},
				salary: 85,
				emoji: "🕴️",
				id: "professional_line_stand_in",
				enabled: true,
			},
			{
				name: "Pet Rock Trainer",
				baselevel: 0,
				description: "Training rocks to be the best they can be, one nap at a time.",
				risk: 0.02,
				damage: {
					type: 1, // percentage money loss
					factor: 0.1, // 10%
					message: "I don't know how to tell you this, but the rock died."
				},
				salary: 90,
				emoji: "🪨",
				id: "pet_rock_trainer",
				enabled: true,
			},
			{
				name: "Janitor",
				baselevel: 0,
				description: "Cleaning up after others, but you take pride in your work.",
				risk: 0.05,
				damage: {
					type: 1, // percentage money loss
					factor: 0.5, // 50%
					message: "Oh god! Chemicals burns are no joke..."
				},
				salary: 100,
				emoji: "🧹",
				id: "janitor",
				enabled: true,
			},
		],

		/* TIER 1 JOBS */
        /*  100 - 150  */
		[
			{
				name: "Fast Food Worker",
				baselevel: 1,
				description: "Hot fries and cold cash, that's your life.",
				risk: 0.05,
				damage: {
					type: 1, // percentage money loss
					factor: 0.25, // 25%
					message: "Next time, don't put ice in that fryer."
				},
				salary: 110,
				emoji: "🍔",
				id: "fast_food_worker",
				enabled: true,
			},
			{
				name: "Customer Service Representative",
				baselevel: 1,
				description: "You handle complaints like a pro, but it's draining.",
				risk: 0.03,
				damage: {
					type: 1, // percentage money loss
					factor: 0.05, // 5%
					message: "Calm down! Yelling at customers is not allowed."
				},
				salary: 115,
				emoji: "📞",
				id: "customer_service_representative",
				enabled: true,
			},
			{
				name: "Retail Sales Associate",
				baselevel: 1,
				description: "You're unhappy and overworked, but at least you get a paycheck.",
				risk: 0.1,
				damage: {
					type: 1, // percentage money loss
					factor: 0.15, // 15%
					message: "You dropped literally everything while restocking shelves. idiot."
				},
				salary: 120,
				emoji: "🛍️",
				id: "retail_sales_associate",
				enabled: true,
			},
			{
				name: "Warehouse Worker",
				baselevel: 1,
				description: "Heavy lifting and low pay, but you make it work.",
				risk: 0.12,
				damage: {
					type: 1, // percentage money loss
					factor: 0.5, // 50%
					message: "You hurt your back lifting a heavy box."
				},
				salary: 125,
				emoji: "📦",
				id: "warehouse_worker",
				enabled: true,
			},
			{
				name: "Delivery Driver",
				baselevel: 1,
				description: "Traffic jams and lights, that's your grind.",
				risk: 0.1,
				damage: {
					type: 1, // percentage money loss
					factor: 0.35, // 35%
					message: "Mail boxes are not bumper cars!"
				},
				salary: 130,
				emoji: "🚚",
				id: "delivery_driver",
				enabled: true,
			},
			{
				name: "Office Clerk",
				baselevel: 1,
				description: "Another day, another spreadsheet.",
				risk: 0.08,
				damage: {
					type: 1, // percentage money loss
					factor: 0.3, // 30%
					message: "You got caught having fun on the job."
				},
				salary: 145,
				emoji: "📄",
				id: "office_clerk",
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
				risk: 0.08,
				damage: {
					type: 2, // extra job cooldown
					factor: 12, // 12 hours
					message: "Boss is PISSED about your safety violation."
				},
				salary: 150,
				emoji: "👷",
				id: "construction_laborer",
				enabled: true,
			},
			{
				name: "Security Guard",
				baselevel: 2,
				description: "Keeping watch over the premises, but it's a lonely job.",
				risk: 0.1,
				damage: {
					type: 1, // percentage money loss
					factor: 0.25, // 25%
					message: "You got caught napping on duty."
				},
				salary: 160,
				emoji: "🛡️",
				id: "security_guard",
				enabled: true,
			},
			{
				name: "Teacher",
				baselevel: 2,
				description: "Shaping young minds, one lesson at a time.",
				risk: 0.07,
				damage: {
					type: 2, // extra job cooldown
					factor: 12, // 12 hours
					message: "You got into a fight with a student. Take some time to cooldown."
				},
				salary: 170,
				emoji: "📚",
				id: "teacher",
				enabled: true,
			},
		],

	]
};
