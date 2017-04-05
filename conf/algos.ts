export const RandomForest = {
	"name": "Random Forest",
	"params": [
		{ "type": "text", "label": "Subset Stragegy", "value": "auto" },
		{ "type": "text", "label": "Impurity", "value": "gini" },
		{ "type": "slider", "label": "Classes", "value": 2, "min":0, "max":100, "step":1 },
		{ "type": "slider", "label": "Trees", "value": 3, "min":0, "max":50, "step":1 },
		{ "type": "slider", "label": "Max Depth", "value": 4, "min":0, "max":50, "step":1 },
		{ "type": "slider", "label": "Max Bins", "value": 32, "min":0, "max":100, "step":1 },
	]
}

export const GradientBoostedTrees = {
	"name": "Gradient Boosted Trees",
	"params": [
		{ "type": "slider", "label": "Iterations", "value": 3, "min":0, "max":50, "step":1 },
		{ "type": "slider", "label": "Classes", "value": 2, "min":0, "max":50, "step":1 },
		{ "type": "slider", "label": "Max Depth", "value": 5, "min":0, "max":50, "step":1 }
	]
}

export const AlgosList = [RandomForest, GradientBoostedTrees];