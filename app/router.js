

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router,controller } = app;

  router.post('/visitorLogin',controller.tokenController.grantVisitorToken)
  router.post('/userLogin',controller.tokenController.grantUserToken)
  router.post('/administratorLogin',controller.tokenController.grantAdministratorToken)
  



  //渲染数据
  router.post('/display/displayCollectedPost'/* 展示收藏的post */, app.middleware.checkToken(),controller.displayController.displayCollectedPost)
  router.post('/display/discover'/* 发现（折叠discussion） */, app.middleware.checkToken(),controller.displayController.discover)
  router.post('/display/displaySchoolDiscussion'/* 展示指定学校及其分类的discussion（折叠discussion） */, app.middleware.checkToken(),controller.displayController.displaySchoolDiscussion)
  router.post('/display/displayTargetDiscussion'/* 展示指定discussion */,app.middleware.checkToken(),controller.displayController.displayTargetDiscussion)
  router.post('/display/displayTargetUserPost'/* 展示指定用户的post */,app.middleware.checkToken(),controller.displayController.displayTargetUserPost)
  router.post('/display/displaySchoolInformation'/* 展示指定学校信息 */, app.middleware.checkToken(),controller.displayController.displaySchoolInformation)
  router.post('/display/displayUserInformation'/* 展示指定用户信息 */, app.middleware.checkToken(),controller.displayController.displayUserInformation)
  router.post('/display/displayAttentionSchool'/* 展示所关注的学校 */, app.middleware.checkToken(),controller.displayController.displayAttentionSchool)
  router.post('/display/displayAttentionUser'/* 展示所关注的用户 */, app.middleware.checkToken(),controller.displayController.displayAttentionUser)
  router.post('/display/displayUserfans',/* 展示关注自己的人 */app.middleware.checkToken(),controller.displayController.displayUserfans)
  router.post('/display/displaySystemMessage'/* 展示所接收到的系统信息 */, app.middleware.checkToken(),controller.displayController.displaySystemMessage)
  router.post('/display/displayToolList'/*展示工具页*/,app.middleware.checkToken(),controller.displayController.displayToolList)



  //用户行为
  router.post('/user/updateUserInformation'/* 更改用户信息 */, app.middleware.checkToken(),controller.userActionController.updateUserInformation)
  router.post('/user/updateBelongToSchool',/* 认证学校 */ app.middleware.checkToken(),controller.userActionController.updateBelongToSchool)
  router.post('/user/updateAttentionSchoolID'/* 关注学校 */, app.middleware.checkToken(),controller.userActionController.updateAttentionSchoolID)
  router.post('/user/updateAttentionUserID'/* 关注用户 */, app.middleware.checkToken(),controller.userActionController.updateAttentionUserID)
  router.post('/user/publishDiscussion'/* 创建discussion */, app.middleware.checkToken(),controller.userActionController.publishDiscussion)
  router.post('/user/publishPost'/* 创建post */, app.middleware.checkToken(),controller.userActionController.publishPost)
  router.post('/user/publishComment'/* 创建comment */, app.middleware.checkToken(),controller.userActionController.publishComment)
  router.post('/user/collectedPost'/* 收藏post */, app.middleware.checkToken(),controller.userActionController.collectedPost)
  router.post('/user/favourornor'/* 点赞或者点踩帖子或者店铺 */, app.middleware.checkToken(),controller.userActionController.favourornor)
  router.post('/user/removeSystemMessage'/* 删除系统消息 */, app.middleware.checkToken(),controller.userActionController.removeSystemMessage)
  router.post('/user/insertCooperationUnit'/* 加入合作者 */, app.middleware.checkToken(),controller.userActionController.insertCooperationUnit)
  router.post('/user/insertRecruiter',/* 加入招募者 */ app.middleware.checkToken(),controller.userActionController.insertRecruiter)
  router.post('/user/upload'/* 上传图片、视频 */,app.middleware.checkToken(),controller.fileController.upload)


  //管理员相关
  router.post('/administrator/sendMessageToUser'/* 发送系统消息给用户 */, app.middleware.checkToken(),controller.manageController.sendMessageToUser)
  router.post('/administrator/freezeUser'/* 冻结用户 */, app.middleware.checkToken(),controller.manageController.freezeUser)
  router.post('/administrator/deleteVoice'/* 删除discussion、post、comment */, app.middleware.checkToken(),controller.manageController.deleteVoice)
  router.post('/administrator/displayAllCooperationUnit'/* 删除所有合作者 */, app.middleware.checkToken(),controller.manageController.displayAllCooperationUnit)
  router.post('/administrator/deleteCooperationUnit'/* 删除特定和合作者 */, app.middleware.checkToken(),controller.manageController.deleteCooperationUnit)
  router.post('/administrator/displayAllRecruiter'/* 删除所有招募者 */, app.middleware.checkToken(),controller.manageController.displayAllRecruiter)
  router.post('/administrator/deleteRecruiter'/* 删除特定招募者 */, app.middleware.checkToken(),controller.manageController.deleteRecruiter)
  router.post('/administrator/qualifyRecruiter',/* 标注 Recruiter 是合格的 */app.middleware.checkToken(),controller.manageController.qualifyRecruiter)
  router.post('/administrator/findUserNeedAuthorization'/* 查看待授权的用户 */,app.middleware.checkToken(),controller.manageController.findUserNeedAuthorization)
  router.post('/administrator/authorizeUserBelongToSchool'/* 授权用户学校 */,app.middleware.checkToken(),controller.manageController.authorizeUserBelongToSchool)
};
