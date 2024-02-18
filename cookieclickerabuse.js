let GLOBAL_PURPOSE

// V0
function get_speed(){
	let speed_str = document.querySelector('#cookiesPerSecond').innerText.substring(11).replaceAll(",","")
	return parseInt(speed_str)
}


// S
function get_purpose_value(){
	let purpose_value
	if (typeof GLOBAL_PURPOSE == 'number') {
		purpose_value = GLOBAL_PURPOSE
	} else {
		// let target_product = document.querySelector(".product.locked.disabled")
		let target_product = document.querySelector(".product.locked")
		purpose_value = parseInt(target_product.children[2].children[3].innerText.replaceAll(",", ""))
	}
	return purpose_value
}

function get_current_value(){
	return parseFloat(document.querySelector("#cookies").children[0].innerText.substring(10).replaceAll(",", ""))
}


function get_speed_delta_by_product(i){
	let nd = document.createRange().createContextualFragment(Game.ObjectsById[i].tooltip())
	// @TODO проверка speed_delta_str на undefined
	let speed_delta_str = nd.querySelectorAll('.descriptionBlock')[0].children[0].innerText.substring(9).replaceAll(",", "")
	return parseFloat(speed_delta_str)
}

// function get_speed_delta_by_product(i){
// 	return i
// }


function show_remaining_time(){
	let current_value = get_current_value()
	let purpose_value = get_purpose_value()
	let speed = get_speed()

	remaining_seconds = (Math.round((purpose_value - current_value)/speed)).toFixed(1)
	remaining_minutes = (Math.floor(remaining_seconds / 60.0)).toFixed(1)
	remaining_hours = (Math.floor(remaining_seconds / 3600.0)).toFixed(1)
	stat_text = "Purpose: " + purpose_value + " | Remain: " + remaining_seconds + " seconds / " +
		remaining_minutes + " minutes / " +
		remaining_hours + " hours"

	document.querySelector("#comments").querySelector(".separatorBottom").innerText = stat_text
}


function update_stats(){
	show_remaining_time()

	let ups = document.querySelectorAll(".product.unlocked.enabled")

	for (var i = 0; i < ups.length; i++) {
	// for (var i = 0; i < 1; i++) {
		let product = ups[i].children[2]

		let speed = get_speed()
		let purpose_value = get_purpose_value()
		let update_cost = parseInt(product.children[3].innerText.replaceAll(",", ""))
		let speed_delta = get_speed_delta_by_product(i)

		let stat = product.querySelector("#stat" + i)
		if (!stat){
			stat = document.createElement("div")
			stat.setAttribute("id", "stat" + i)
			product.append(stat)
		}

		// @TODO F иногда некорректно обновляются
		// let ksi = (speed_delta / update_cost).toFixed(5)
		let ksi = (update_cost / speed_delta).toFixed(1)
		let fitness = update_cost+purpose_value*(speed/(speed+speed_delta)).toFixed(5)

		stat.innerText = '( ξ=' + ksi + ' / F=' + fitness + ' )'
	}
}

setInterval(update_stats, 500)

