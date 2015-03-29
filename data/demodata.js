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
			'loca': '四川省内江市', 
			// 活动ICON
			'icon': '', 
			'type': '1', // 类型
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
						'title': '测试新的数据吧！',
						'text': '2015同学会是由高12级组织的一次主要的活动。'
					}
				}
			],
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