exports.buildToast = () => {
	return {
		title: 'Success',
		message: 'Building Added Successfully',
		type: 'success',
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	};
};
