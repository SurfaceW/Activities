module.exports = {
	'testdata':	[
		{
			// 活动ID，后端给定
			'id': 0, 
			// 活动名称
			'name': '2015同学聚会', 
			// 活动日期
			'date': '2013-04-05', 
			// 活动地址
			'loca': '四川省内江市', 
			// 活动ICON
			'icon': 2, 
			'type': 1, // 类型
			'design': {
				'template': 1, // 设计套用模板
				'bgurl': './static/xx/xx.png',
				'imgurl': './xx/xxx.png',
				'text': '2015同学会是由高12级组织的一次主要的活动。',
				'video': 'http://url.com/xxx',
				'link': 'http://url.gosomewhere.com/xxx',
				'extra': '更多详细的信息'
			},
			'info': ['学院', '班级', '姓名', '手机'], // 需要调查的问题
			'share': {
				'url': '',
				'2dc': ''
			},
			'participators': [
				{'name': '叶青楠', 'tel': '18811347020'},
				{'name': '柴铎', 'tel': '18811347021'}
			]
		}
	]
};