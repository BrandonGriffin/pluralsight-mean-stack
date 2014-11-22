describe('myUser', function() {
	beforeEach(module('app'));

	describe('isAdmin', function() {
		it('returns false if the user does not have the admin role', inject(function(myUser) {
			var user = new myUser();
			user.roles = ['not admin'];
			expect(user.isAdmin()).to.be.false;
		}));

		it('returns true if the user has teh admin role', function(myUser) {
			var user = new myUser();
			user.roles = ['admin'];
			expect(user.isAdmin()).to.be.true;
		})
	});
})