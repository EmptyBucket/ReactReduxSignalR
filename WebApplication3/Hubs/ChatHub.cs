using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;

namespace WebApplication3.Hubs
{
    public class ChatHub : Hub
    {
        private readonly HashSet<User> _users = new HashSet<User>(new UserEqualityComperer());

        public void Connect(string userName)
        {
            if (_users.Add(new User(userName, Context.ConnectionId)))
                Clients.Others.OnConnectedUser(new {UserName = userName, Id = Context.ConnectionId});
        }

        public void SendMessage(string message) => 
            Clients.Others.ReceiveMessage(new {UserName = _users.First(user => user.ConnectionId == Context.ConnectionId), Message = message, DateCreated = DateTime.Now});

        private class User
        {
            public User(string userName, string connectionId)
            {
                Name = userName;
                ConnectionId = connectionId;
            }

            public string ConnectionId { get; }

            public string Name { get; }
        }

        private class UserEqualityComperer : IEqualityComparer<User>
        {
            public bool Equals(User x, User y)
            {
                if (ReferenceEquals(x, y))
                    return true;
                return (x != null) && (y != null) && (x.Name == y.Name) && (x.ConnectionId == y.ConnectionId);
            }

            public int GetHashCode(User obj) =>
                obj.ConnectionId.GetHashCode() ^ obj.Name.GetHashCode();
        }
    }
}