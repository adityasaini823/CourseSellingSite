

router.get('/users',isAdmin,getAllUsers);
router.delete('/delete/:id',isAdmin,deleteUser);