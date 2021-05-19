Set(varInMeeting, false);
Set(varentityId, Param("entityId"));
Set(varSubEntityId, Param("subEntityId"));
Set(varDebug, Param("debug"));
If(IsEmpty(Planners), ClearCollect(Planners, Planner.ListMyPlans().value));
/*
Clear(Planners);
Collect(
    Planners,
    {
        id: "0",
        Value: " "
    }
);
Collect(Planners, Planner.ListMyPlans().value);
*/

If(
    varSubEntityId = "{subEntityId}" Or varDebug = "true",
    Set(
        varInMeeting, 
        true
        ),
    Set(
        varInMeeting, 
        false
        )
);
If (varInMeeting, Navigate(ManageActionItems), Navigate(HomeScreen));

///Debug 
Set(varSource, Param("source"));
Set(varLocale, Param("locale"));
Set(varChannelId, Param("channelId"));
Set(varChannelType, Param("channelType"));
Set(varChatId, Param("chatId"));
Set(varGroupId, Param("groupId"));
Set(varHostClientType, Param("hostClientType"));
Set(varIsFullScreen, Param("isFullScreen"));
Set(varTeamId, Param("teamId"));
Set(varTeamType, Param("teamType"));
Set(varTheme, Param("theme"));
Set(varTeamRole, Param("userTeamRole"));

Set(ParamGalleryVisible, false);
Clear(ParamList);
Collect(
    ParamList,
    {
        ParamName: "source",
        Value: varSource
    },
    {
        ParamName: "locale",
        Value: varLocale
    },
    {
        ParamName: "channelId",
        Value: varChannelId
    },
    {
        ParamName: "channelType",
        Value: varChannelType
    },
    {
        ParamName: "chatId",
        Value: varChatId
    },
    {
        ParamName: "groupId",
        Value: varGroupId
    },
    {
        ParamName: "hostClientType",
        Value: varHostClientType
    },
    {
        ParamName: "isFullScreen",
        Value: varIsFullScreen
    },
        {
        ParamName: "entityId",
        Value: varentityId
    },
    {
        ParamName: "subEntityId",
        Value: varSubEntityId
    },
    {
        ParamName: "teamId",
        Value: varTeamId
    },
    {
        ParamName: "teamType",
        Value: varTeamType
    },
    {
        ParamName: "theme",
        Value: varTheme
    },
    {
        ParamName: "userTeamRole",
        Value: varTeamRole
    }
)
