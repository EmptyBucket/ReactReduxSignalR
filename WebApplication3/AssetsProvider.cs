using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebApplication3
{
    public class AssetsProvider
    {
        private static AssetsProvider _assetsProvider;

        private static readonly object LockInstance = new object();

        private dynamic _assets;

        public dynamic Assets
        {
            get
            {
                using (var md5 = MD5.Create())
                using (var stream = File.OpenRead(_pathAssetsFile))
                {
                    var tmpHash = md5.ComputeHash(stream);
                    if (_hash != null && _hash.SequenceEqual(tmpHash)) return _assets;
                    _hash = tmpHash;
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var streamReader = new StreamReader(stream))
                    using (var jsonTextReader = new JsonTextReader(streamReader))
                        _assets = JObject.Load(jsonTextReader);
                }
                return _assets;
            }
        }

        private byte[] _hash;

        private readonly string _pathAssetsFile;

        private AssetsProvider(string pathAssetsFile)
        {
            _pathAssetsFile = pathAssetsFile;
        }

        public static AssetsProvider Instance()
        {
            if (_assetsProvider == null)
                throw new Exception("Context associated");
            return _assetsProvider;
        }

        public static AssetsProvider Bind(string pathAssets)
        {
            lock(LockInstance)
                _assetsProvider = new AssetsProvider(pathAssets);
            return _assetsProvider;
        }
    }
}