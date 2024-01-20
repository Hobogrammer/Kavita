using System;
using System.Runtime.InteropServices;

namespace API.Tests;

public class TestHelper
{
    public const string Memory = "Filename=:memory:";
    public const string CacheDirectory = @"C:/kavita/config/cache/";
    public const string CoverImageDirectory = @"C:/kavita/config/covers/";
    public const string BackupDirectory = @"C:/kavita/config/backups/";
    public const string LogDirectory = "C:/kavita/config/logs/";
    public const string BookmarkDirectory = "C:/kavita/config/bookmarks/";
    public const string SiteThemeDirectory = "C:/kavita/config/themes/";
    public const string TempDirectory = "C:/kavita/config/temp/";
    public const string DataDirectory = "C:/data/";
    public const string KavitaRootDirectory = "C:/kavita/";
    public const string KavitaConfigDirectory = "C:/kavita/config/";

    /* public static DbConnection CreateInMemoryDatabase() */
    /* { */
    /*     var connection = new SqliteConnection(Memory); */
    /*     connection.Open(); */
    /*     return connection; */
    /* } */

    public static string ConvertToNixDirPath(string dirPath)
    {
        var newDirPath = dirPath;
        // downcase the drive letter
        newDirPath = newDirPath.Replace(newDirPath[0], Char.ToLower(newDirPath[0]));
        // remove colon
        newDirPath = newDirPath.Remove(1);
    
        return newDirPath;
    }

    public static string GetOsSafeDirPath(string dirPath) {
       if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) return dirPath;

       return ConvertToNixDirPath(dirPath);
    }
}
