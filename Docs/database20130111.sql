USE [QbDynamicQuery]
GO
/****** Object:  Table [dbo].[DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DynamicQueryTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryTable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryTableType]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DynamicQueryTableType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryTableType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DynamicQueryQuery]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DynamicQueryQuery](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](300) NOT NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[Active] [bit] NOT NULL,
	[WhereStatement] [nvarchar](500) NULL,
	[SelectStatement] [nvarchar](max) NULL,
 CONSTRAINT [PK_DynamicQueryQuery] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DynamicQueryAssociation]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DynamicQueryAssociation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PrimaryKeyTableId] [int] NOT NULL,
	[PrimaryKeyTable] [varchar](50) NOT NULL,
	[PrimaryKeyTableColumn] [varchar](50) NOT NULL,
	[ForeignKeyTable] [varchar](50) NOT NULL,
	[ForeignKeyTableColumn] [varchar](50) NOT NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[UserName] [varchar](50) NULL,
	[Active] [bit] NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_DynamicQueryAssociation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryTableSubType]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DynamicQueryTableSubType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryTableSubType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DynamicQueryTableColumn]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DynamicQueryTableColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TableId] [int] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[ColumnType] [varchar](50) NULL,
	[Length] [int] NULL,
	[Precision] [int] NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[UserName] [varchar](50) NULL,
	[Active] [bit] NOT NULL,
	[Type] [int] NULL,
	[SubType] [int] NULL,
 CONSTRAINT [PK_DynamicQueryTableColumn] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryCalculatedColumn]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DynamicQueryCalculatedColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[TableId] [int] NOT NULL,
	[SQL] [varchar](500) NOT NULL,
	[SQLName] [varchar](50) NOT NULL,
	[Type] [int] NOT NULL,
	[SubType] [int] NULL,
	[GroupBy] [bit] NOT NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[UserName] [varchar](50) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryCalculatedColumn] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryColumn]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DynamicQueryColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DynamicQueryId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[ColumnId] [int] NOT NULL,
	[ColumnName] [nvarchar](100) NOT NULL,
	[Calculated] [bit] NOT NULL,
	[IsSelected] [bit] NOT NULL,
	[IsOrderBy] [bit] NOT NULL,
	[Direction] [varchar](20) NULL,
	[Position] [int] NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[IsWhere] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryColumn] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryCalculatedColumnTable]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DynamicQueryCalculatedColumnTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CalculatedColumnId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
	[ColumnId] [int] NOT NULL,
 CONSTRAINT [PK_DynamicQueryCalculatedColumnTable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DynamicQueryQueryCalculatedColumn]    Script Date: 01/11/2013 07:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DynamicQueryQueryCalculatedColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DynamicQueryId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[ColumnId] [int] NOT NULL,
	[ColumnName] [nvarchar](100) NOT NULL,
	[Calculated] [bit] NOT NULL,
	[IsSelected] [bit] NOT NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[IsWhere] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryQueryCalculatedColum] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF_DynamicQueryAssociation_LastChangeDate]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryAssociation] ADD  CONSTRAINT [DF_DynamicQueryAssociation_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
GO
/****** Object:  Default [DF_DynamicQueryAssociation_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryAssociation] ADD  CONSTRAINT [DF_DynamicQueryAssociation_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF__DynamicQu__Group__160F4887]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  DEFAULT ((0)) FOR [GroupBy]
GO
/****** Object:  Default [DF_DynamicQueryCalculatedColumn_LastChangeDate]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  CONSTRAINT [DF_DynamicQueryCalculatedColumn_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
GO
/****** Object:  Default [DF_DynamicQueryCalculatedColumn_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  CONSTRAINT [DF_DynamicQueryCalculatedColumn_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF__DynamicQu__IsWhe__22751F6C]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryColumn] ADD  DEFAULT ((0)) FOR [IsWhere]
GO
/****** Object:  Default [DF_DynamicQueryQuery_LastChangeDate]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryQuery] ADD  CONSTRAINT [DF_DynamicQueryQuery_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
GO
/****** Object:  Default [DF_DynamicQueryQuery_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryQuery] ADD  CONSTRAINT [DF_DynamicQueryQuery_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF_DynamicQueryTable_LastChangeDate]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTable] ADD  CONSTRAINT [DF_DynamicQueryTable_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
GO
/****** Object:  Default [DF_DynamicQueryTable_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTable] ADD  CONSTRAINT [DF_DynamicQueryTable_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF_DynamicQueryTableColumn_LastChangeDate]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableColumn] ADD  CONSTRAINT [DF_DynamicQueryTableColumn_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
GO
/****** Object:  Default [DF_DynamicQueryTableColumn_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableColumn] ADD  CONSTRAINT [DF_DynamicQueryTableColumn_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF_DynamicQueryTableSubType_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableSubType] ADD  CONSTRAINT [DF_DynamicQueryTableSubType_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  Default [DF_DynamicQueryTableType_Active]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableType] ADD  CONSTRAINT [DF_DynamicQueryTableType_Active]  DEFAULT ((1)) FOR [Active]
GO
/****** Object:  ForeignKey [FK_DynamicQueryAssociation_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryAssociation]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryAssociation_DynamicQueryTable] FOREIGN KEY([PrimaryKeyTableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryAssociation] CHECK CONSTRAINT [FK_DynamicQueryAssociation_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType] FOREIGN KEY([SubType])
REFERENCES [dbo].[DynamicQueryTableSubType] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType] FOREIGN KEY([Type])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn] FOREIGN KEY([CalculatedColumnId])
REFERENCES [dbo].[DynamicQueryCalculatedColumn] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumnTable_DynamicQueryColumn]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryColumn] FOREIGN KEY([ColumnId])
REFERENCES [dbo].[DynamicQueryTableColumn] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryQuery]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryQuery] FOREIGN KEY([DynamicQueryId])
REFERENCES [dbo].[DynamicQueryQuery] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryQuery]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryTableColumn]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTableColumn] FOREIGN KEY([ColumnId])
REFERENCES [dbo].[DynamicQueryTableColumn] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTableColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryCalculatedColumn]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryCalculatedColumn] FOREIGN KEY([ColumnId])
REFERENCES [dbo].[DynamicQueryCalculatedColumn] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryCalculatedColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryQuery]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryQuery] FOREIGN KEY([DynamicQueryId])
REFERENCES [dbo].[DynamicQueryQuery] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryQuery]
GO
/****** Object:  ForeignKey [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryQueryCalculatedColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTable]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTableSubType]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableSubType] FOREIGN KEY([SubType])
REFERENCES [dbo].[DynamicQueryTableSubType] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableSubType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTableType]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableType] FOREIGN KEY([Type])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableSubType_DynamicQueryTableType]    Script Date: 01/11/2013 07:07:26 ******/
ALTER TABLE [dbo].[DynamicQueryTableSubType]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableSubType_DynamicQueryTableType] FOREIGN KEY([TypeId])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
ALTER TABLE [dbo].[DynamicQueryTableSubType] CHECK CONSTRAINT [FK_DynamicQueryTableSubType_DynamicQueryTableType]
GO
