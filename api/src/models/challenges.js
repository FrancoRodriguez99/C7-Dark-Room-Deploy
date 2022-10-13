const mongoose = require("mongoose");

const challengesSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		active: {
			type: Boolean,
		},
		participants: [
			{
				type: mongoose.Types.ObjectId,
				ref: "userPhotographer",
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("challenges", challengesSchema);
