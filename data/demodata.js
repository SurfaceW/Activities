module.exports = {
'testdata':	[
{
	// 活动ID，后端给定
	'id': 0, 
	// 活动名称
	'name': '2015同学聚会', 
	// 活动日期
	'date': '2013-4-5', 
	// 活动地址
	'loca': 'xxxx', 
	// 活动ICON
	'icon': 'aaa', 
	'type': 'xxx', // 类型
	'design': [
		{
			'page': 1,
			'template': 1,
			'components': {
				'bgurl': './static/xx/xx.png',
				'title':'2015高中同学聚会',
				'text': 'this gonna be a text for introduction of this activity.'
			}
		},
		{
			'page': 2,
			'template': 2,
			'components': {
				'color': 'blue',
				'text': '2015同学会是由高12级组织的一次主要的活动。'
			}
		}
	],
	'info': [], // 需要调查的问题
	'share': {
		'shareURL': 'http://xxx.com/xxx',
		'share2DC': 'http://xxx.com/xxx'
	},
	'participators': []
},
{
	'id': 1,
	'name': '南非支教活动',
	'design': []
}]};