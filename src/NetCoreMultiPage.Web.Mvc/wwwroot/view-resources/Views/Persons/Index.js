﻿(function(){
    $(function(){
        var _personService = abp.services.app.person;

        var _$modal = $("#PersonCreateModal");

        var _$form = _$modal.find('form');

         //***********  新增联系人 ************
        _$form.find('button[type="submit"]').click(function (e) {
            e.preventDefault();
            if (!_$form.valid()) {
                return;
            }

            var personEditDto = _$form.serializeFormToObject();//序列化表单为对象



            abp.ui.setBusy(_$modal);            //约定大于配置
            _personService.createOrUpdatePerson({ personEditDto }).done(function () {

                _$modal.modal('hide');
                location.reload(true);


            }).always(function () {
                abp.ui.clearBusy(_$modal);


                });
        })
        //************   删除联系人   ************
        $('.delete-person').click(function () {
            var personId = $(this).attr("data-person-id");
            var personName = $(this).attr('data-person-name');
            deletePerson(personId, personName);
        });
        //删除联系人方法
        function deletePerson(id, name) {
            abp.message.confirm("确定要删除姓名为" + name + "的联系人信息?", 
                function (isConfirmed) {
                    if (isConfirmed) {
                        _personService.deletePerson({ id: id }).done(function () {
                            refreshPersonList();
                        });
                    }
                }
            );
        }

        //************   编辑联系人   ************
        $('.edit-person').click(function (e) {
            e.preventDefault();
            var personId = $(this).attr("data-person-id");

            _personService.getPersonForEdit({ id: personId }).done(function (data) {
                $("input[name=Id]").val(data.person.id);
                $("input[name=Name]").val(data.person.name).parent().addClass('focused');
                $("input[name=EmailAddress]").val(data.person.emailAddress).parent().addClass('focused');
               // $("input[name=PhoneNumber]").val(data.person.phoneNumbers[0].number).parent().addClass('focused');
               // $("select[name=PhoneNumberType]").selectpicker('val', data.person.phoneNumbers[0].type);
                $("input[name=Address]").val(data.person.address).parent().addClass('focused');
            });
        });

        //************   刷新页面   ************
        $('#RefreshButton').click(function () {
            refreshPersonList();
        });

        function refreshPersonList() {
            location.reload(true);
        }
		


		
        $('#PersonCreateModal').on('hide.bs.modal',
            function () {
                // 执行一些动作...


                _$form[0].reset();
            });

    });
})();