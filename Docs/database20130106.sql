USE [master]
GO
/****** Object:  Database [QbDynamicQuery]    Script Date: 01/06/2013 16:36:20 ******/
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'QbDynamicQuery')
BEGIN
CREATE DATABASE [QbDynamicQuery] ON  PRIMARY 
( NAME = N'QbDynamicQuery', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\QbDynamicQuery.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QbDynamicQuery_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\QbDynamicQuery_log.ldf' , SIZE = 10176KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
END
GO
ALTER DATABASE [QbDynamicQuery] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QbDynamicQuery].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QbDynamicQuery] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [QbDynamicQuery] SET ANSI_NULLS OFF
GO
ALTER DATABASE [QbDynamicQuery] SET ANSI_PADDING OFF
GO
ALTER DATABASE [QbDynamicQuery] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [QbDynamicQuery] SET ARITHABORT OFF
GO
ALTER DATABASE [QbDynamicQuery] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [QbDynamicQuery] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [QbDynamicQuery] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [QbDynamicQuery] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [QbDynamicQuery] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [QbDynamicQuery] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [QbDynamicQuery] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [QbDynamicQuery] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [QbDynamicQuery] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [QbDynamicQuery] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [QbDynamicQuery] SET  DISABLE_BROKER
GO
ALTER DATABASE [QbDynamicQuery] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [QbDynamicQuery] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [QbDynamicQuery] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [QbDynamicQuery] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [QbDynamicQuery] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [QbDynamicQuery] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [QbDynamicQuery] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [QbDynamicQuery] SET  READ_WRITE
GO
ALTER DATABASE [QbDynamicQuery] SET RECOVERY FULL
GO
ALTER DATABASE [QbDynamicQuery] SET  MULTI_USER
GO
ALTER DATABASE [QbDynamicQuery] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [QbDynamicQuery] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'QbDynamicQuery', N'ON'
GO
USE [QbDynamicQuery]
GO
/****** Object:  Table [dbo].[DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryTable]') AND type in (N'U'))
BEGIN
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
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryQuery]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryQuery]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[DynamicQueryQuery](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](300) NOT NULL,
	[LastChangeDate] [datetime] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryQuery] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[DynamicQueryTableType]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableType]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[DynamicQueryTableType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_DynamicQueryTableType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[DynamicQueryTableSubType]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableSubType]') AND type in (N'U'))
BEGIN
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
END
GO
/****** Object:  Table [dbo].[DynamicQueryAssociation]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryAssociation]') AND type in (N'U'))
BEGIN
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
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryCalculatedColumn]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[DynamicQueryCalculatedColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[TableId] [int] NOT NULL,
	[SQL] [varchar](500) NOT NULL,
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
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryTableColumn]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]') AND type in (N'U'))
BEGIN
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
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryColumn]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[DynamicQueryColumn](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DynamicQueryId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
	[TableName] [nvarchar](100) NOT NULL,
	[ColumnId] [int] NOT NULL,
	[ColumnName] [nvarchar](100) NOT NULL,
	[Calculated] [bit] NOT NULL,
	[IsSelected] [bit] NOT NULL,
	[IsWhere] [bit] NOT NULL,
	[Operator] [varchar](20) NULL,
	[Data] [varchar](100) NULL,
	[GroupLevel] [int] NULL,
	[GroupOperator] [varchar](20) NULL,
	[IsOrderBy] [bit] NOT NULL,
	[Direction] [varchar](20) NULL,
	[Position] [int] NULL,
	[LastChangeDate] [datetime] NOT NULL,
 CONSTRAINT [PK_DynamicQueryColumn] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DynamicQueryCalculatedColumnTable]    Script Date: 01/06/2013 16:36:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumnTable]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[DynamicQueryCalculatedColumnTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CalculatedColumnId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
 CONSTRAINT [PK_DynamicQueryCalculatedColumnTable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Default [DF_DynamicQueryTable_LastChangeDate]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTable_LastChangeDate]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTable]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTable_LastChangeDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTable] ADD  CONSTRAINT [DF_DynamicQueryTable_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
END


End
GO
/****** Object:  Default [DF_DynamicQueryTable_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTable_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTable]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTable_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTable] ADD  CONSTRAINT [DF_DynamicQueryTable_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF_DynamicQueryQuery_LastChangeDate]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryQuery_LastChangeDate]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryQuery]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryQuery_LastChangeDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryQuery] ADD  CONSTRAINT [DF_DynamicQueryQuery_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
END


End
GO
/****** Object:  Default [DF_DynamicQueryQuery_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryQuery_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryQuery]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryQuery_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryQuery] ADD  CONSTRAINT [DF_DynamicQueryQuery_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF_DynamicQueryTableType_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTableType_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableType]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTableType_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTableType] ADD  CONSTRAINT [DF_DynamicQueryTableType_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF_DynamicQueryTableSubType_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTableSubType_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableSubType]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTableSubType_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTableSubType] ADD  CONSTRAINT [DF_DynamicQueryTableSubType_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF_DynamicQueryAssociation_LastChangeDate]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryAssociation_LastChangeDate]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryAssociation]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryAssociation_LastChangeDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryAssociation] ADD  CONSTRAINT [DF_DynamicQueryAssociation_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
END


End
GO
/****** Object:  Default [DF_DynamicQueryAssociation_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryAssociation_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryAssociation]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryAssociation_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryAssociation] ADD  CONSTRAINT [DF_DynamicQueryAssociation_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF__DynamicQu__Group__5441852A]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF__DynamicQu__Group__5441852A]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF__DynamicQu__Group__5441852A]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  DEFAULT ((0)) FOR [GroupBy]
END


End
GO
/****** Object:  Default [DF_DynamicQueryCalculatedColumn_LastChangeDate]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryCalculatedColumn_LastChangeDate]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryCalculatedColumn_LastChangeDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  CONSTRAINT [DF_DynamicQueryCalculatedColumn_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
END


End
GO
/****** Object:  Default [DF_DynamicQueryCalculatedColumn_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryCalculatedColumn_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryCalculatedColumn_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] ADD  CONSTRAINT [DF_DynamicQueryCalculatedColumn_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  Default [DF_DynamicQueryTableColumn_LastChangeDate]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTableColumn_LastChangeDate]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTableColumn_LastChangeDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTableColumn] ADD  CONSTRAINT [DF_DynamicQueryTableColumn_LastChangeDate]  DEFAULT (getdate()) FOR [LastChangeDate]
END


End
GO
/****** Object:  Default [DF_DynamicQueryTableColumn_Active]    Script Date: 01/06/2013 16:36:22 ******/
IF Not EXISTS (SELECT * FROM sys.default_constraints WHERE object_id = OBJECT_ID(N'[dbo].[DF_DynamicQueryTableColumn_Active]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
Begin
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_DynamicQueryTableColumn_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[DynamicQueryTableColumn] ADD  CONSTRAINT [DF_DynamicQueryTableColumn_Active]  DEFAULT ((1)) FOR [Active]
END


End
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableSubType_DynamicQueryTableType]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableSubType_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableSubType]'))
ALTER TABLE [dbo].[DynamicQueryTableSubType]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableSubType_DynamicQueryTableType] FOREIGN KEY([TypeId])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableSubType_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableSubType]'))
ALTER TABLE [dbo].[DynamicQueryTableSubType] CHECK CONSTRAINT [FK_DynamicQueryTableSubType_DynamicQueryTableType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryAssociation_DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryAssociation_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryAssociation]'))
ALTER TABLE [dbo].[DynamicQueryAssociation]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryAssociation_DynamicQueryTable] FOREIGN KEY([PrimaryKeyTableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryAssociation_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryAssociation]'))
ALTER TABLE [dbo].[DynamicQueryAssociation] CHECK CONSTRAINT [FK_DynamicQueryAssociation_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType] FOREIGN KEY([SubType])
REFERENCES [dbo].[DynamicQueryTableSubType] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableSubType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType] FOREIGN KEY([Type])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumn]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumn] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumn_DynamicQueryTableType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTableSubType]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTableSubType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableSubType] FOREIGN KEY([SubType])
REFERENCES [dbo].[DynamicQueryTableSubType] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTableSubType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableSubType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryTableColumn_DynamicQueryTableType]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableType] FOREIGN KEY([Type])
REFERENCES [dbo].[DynamicQueryTableType] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryTableColumn_DynamicQueryTableType]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryTableColumn]'))
ALTER TABLE [dbo].[DynamicQueryTableColumn] CHECK CONSTRAINT [FK_DynamicQueryTableColumn_DynamicQueryTableType]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryQuery]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryQuery]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryQuery] FOREIGN KEY([DynamicQueryId])
REFERENCES [dbo].[DynamicQueryQuery] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryQuery]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryQuery]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTable]
GO
/****** Object:  ForeignKey [FK_DynamicQueryColumn_DynamicQueryTableColumn]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryTableColumn]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTableColumn] FOREIGN KEY([ColumnId])
REFERENCES [dbo].[DynamicQueryTableColumn] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryColumn_DynamicQueryTableColumn]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryColumn]'))
ALTER TABLE [dbo].[DynamicQueryColumn] CHECK CONSTRAINT [FK_DynamicQueryColumn_DynamicQueryTableColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumnTable]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn] FOREIGN KEY([CalculatedColumnId])
REFERENCES [dbo].[DynamicQueryCalculatedColumn] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumnTable]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryCalculatedColumn]
GO
/****** Object:  ForeignKey [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]    Script Date: 01/06/2013 16:36:22 ******/
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumnTable]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable]  WITH CHECK ADD  CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable] FOREIGN KEY([TableId])
REFERENCES [dbo].[DynamicQueryTable] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]') AND parent_object_id = OBJECT_ID(N'[dbo].[DynamicQueryCalculatedColumnTable]'))
ALTER TABLE [dbo].[DynamicQueryCalculatedColumnTable] CHECK CONSTRAINT [FK_DynamicQueryCalculatedColumnTable_DynamicQueryTable]
GO
