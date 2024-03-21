function generateWoodLinks(wood){
	return [
		{
			rel: "self",
			method: "GET",
			href: `/api/wood/${wood.id}`,
		},
		{
			rel: "edit",
			method: "PUT",
			href: `/api/wood/${wood.id}`,
		},
		{
			rel: "delete",
			method: "DELETE",
			href: `/api/wood/${wood.id}`
		},
		{
			rel: "sameHardness",
			method: "GET",
			href: `/api/wood/${wood.hardness}`
		}
	]
	
};

function generateGlobalLinksWoods() {
	return [
		{
			rel: "all",
			method: "GET",
			href: `/api/wood`,
		},
		{
			rel: "create",
			method: "POST",
			href: `/api/wood`,
		},
		{
			rel: "byHardness",
			method: "GET",
			href: `/api/wood/:hardness`,
		}
	]
	
};
module.exports = {
	generateWoodLinks,
	generateGlobalLinksWoods
};