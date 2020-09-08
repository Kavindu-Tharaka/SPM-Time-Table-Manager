exports.buildToast = (type, title, message) => {
	return {
		title,
		message,
		type,
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 2000
		},
	};
};